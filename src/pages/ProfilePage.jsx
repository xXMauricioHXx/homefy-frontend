import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { uploadProfilePicture, updateUserPhotoUrl } from "../firebase";
import { updateUserProfilePicture } from "../services/api";
import Header from "../components/Header";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import "./ProfilePage.css";

function ProfilePage() {
  const { user, userData, updateUserData, userDataLoading, setUserData } =
    useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  // Load user data into form when available
  useEffect(() => {
    if (userData) {
      setValue("name", userData.name || "");
    }
  }, [userData, setValue]);

  const onSubmit = async (data) => {
    setSuccessMessage("");
    setErrorMessage("");

    // Only send editable fields (phone and email cannot be changed)
    const { name } = data;

    try {
      await updateUserData({ name });
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

  const handleAvatarClick = () => {
    if (!uploadingAvatar) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setUploadingAvatar(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Upload image to Firebase Storage
      const photoUrl = await uploadProfilePicture(file, user.uid);

      // Update user's photoUrl in Firebase Auth
      await updateUserPhotoUrl(user, photoUrl);

      // Get user token for backend API call
      const token = await user.getIdToken();

      // Update photoUrl in backend users collection
      await updateUserProfilePicture(photoUrl, token);

      // Update only the photoUrl property, preserving other user data
      setUserData((prevData) => ({
        ...prevData,
        photoUrl: photoUrl,
      }));

      setSuccessMessage("Foto de perfil atualizada com sucesso!");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      setErrorMessage(
        error.message || "Erro ao atualizar foto de perfil. Tente novamente.",
      );
    } finally {
      setUploadingAvatar(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
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
            <div
              className={`profile-avatar-container ${uploadingAvatar ? "uploading" : ""}`}
              onClick={handleAvatarClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleAvatarClick();
                }
              }}
              aria-label="Clique para alterar foto de perfil"
            >
              {userData?.photoUrl ? (
                <img
                  src={userData.photoUrl}
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
              {uploadingAvatar && (
                <div className="profile-avatar-overlay">
                  <div className="profile-avatar-spinner"></div>
                </div>
              )}
              <div className="profile-avatar-edit-hint">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileChange}
              style={{ display: "none" }}
              aria-label="Selecionar foto de perfil"
            />
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
                error={undefined}
                disabled
                value={userData?.phone || ""}
                readOnly
                hint="O telefone não pode ser alterado"
              />

              <FormInput
                name="email"
                label="Email"
                type="email"
                placeholder="seu@email.com"
                register={register}
                error={undefined}
                disabled
                value={userData?.email || user?.email || ""}
                readOnly
                hint="O email não pode ser alterado"
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
