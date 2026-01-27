import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import "./ProfilePage.css";

function ProfilePage() {
  const { user, userData, updateUserData, userDataLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  // Load user data into form when available
  useEffect(() => {
    if (userData) {
      setValue("name", userData.name || "");
      setValue("phone", userData.phone || "");
      setValue("email", userData.email || user?.email || "");
    }
  }, [userData, user, setValue]);

  const onSubmit = async (data) => {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await updateUserData(data);
      setSuccessMessage("Perfil atualizado com sucesso!");
      setIsEditing(false);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage("Erro ao atualizar perfil. Tente novamente.");
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="profile-container">
      {/* Top Navigation Bar */}
      <Header />

      {/* Main Content */}
      <main className="profile-main">
        <div className="profile-card">
          {/* Header */}
          <div className="profile-header">
            <div className="profile-avatar-container">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="profile-avatar"
                />
              ) : (
                <div className="profile-avatar-placeholder">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
            <h1 className="profile-title">Meu Perfil</h1>
            <p className="profile-subtitle">
              Gerencie suas informações pessoais
            </p>
          </div>

          {/* Success/Error Messages */}
          {successMessage && (
            <div className="profile-message profile-message-success">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M16.6667 5L7.50004 14.1667L3.33337 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="profile-message profile-message-error">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M10 6V10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M10 14H10.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
            <div className="profile-form-fields">
              <FormInput
                name="name"
                label="Nome Completo"
                placeholder="Digite seu nome completo"
                register={register}
                error={errors.name}
                disabled={!isEditing || userDataLoading}
                {...register("name", {
                  required: "Nome é obrigatório",
                  minLength: {
                    value: 3,
                    message: "Nome deve ter no mínimo 3 caracteres",
                  },
                })}
              />

              <FormInput
                name="phone"
                label="Telefone"
                type="tel"
                placeholder="+55 (11) 98765-4321"
                register={register}
                error={errors.phone}
                disabled={!isEditing || userDataLoading}
                {...register("phone", {
                  required: "Telefone é obrigatório",
                  pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message:
                      "Telefone deve estar no formato internacional (+55...)",
                  },
                })}
              />

              <FormInput
                name="email"
                label="Email"
                type="email"
                placeholder="seu@email.com"
                register={register}
                error={errors.email}
                disabled={!isEditing || userDataLoading}
                {...register("email", {
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                })}
              />
            </div>

            {/* Action Buttons */}
            <div className="profile-form-actions">
              {!isEditing ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => setIsEditing(true)}
                  fullWidth
                >
                  Editar Perfil
                </Button>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleCancel}
                    disabled={userDataLoading}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!isDirty || userDataLoading}
                  >
                    {userDataLoading ? "Salvando..." : "Salvar Alterações"}
                  </Button>
                </>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
