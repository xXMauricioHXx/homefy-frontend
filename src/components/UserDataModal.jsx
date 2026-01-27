import { useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useAuth } from "../contexts/AuthContext";
import FormInput from "./FormInput";
import Button from "./Button";
import "./UserDataModal.css";

/**
 * Modal for collecting user data when not found in database
 * This modal is blocking and cannot be closed without filling the form
 */
function UserDataModal({ isOpen }) {
  const { user, updateUserData, userDataLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: user?.email || "",
    },
  });

  // Pre-fill email from Firebase when user changes
  useEffect(() => {
    if (user?.email) {
      setValue("email", user.email);
    }
  }, [user, setValue]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const onSubmit = async (data) => {
    try {
      await updateUserData(data);
    } catch (error) {
      console.error("Error saving user data:", error);
      // Error is already handled in the context
    }
  };

  if (!isOpen) return null;

  return (
    <div className="user-data-modal-overlay">
      <div className="user-data-modal-container">
        {/* Header */}
        <div className="user-data-modal-header">
          <h2 className="user-data-modal-title">Complete seu Perfil</h2>
          <p className="user-data-modal-subtitle">
            Para continuar, precisamos de algumas informações
          </p>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="user-data-modal-form"
        >
          <div className="user-data-modal-body">
            <FormInput
              name="name"
              label="Nome Completo"
              placeholder="Digite seu nome completo"
              register={register}
              error={errors.name}
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
              {...register("email", {
                required: "Email é obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
            />
          </div>

          {/* Footer */}
          <div className="user-data-modal-footer">
            <Button
              type="submit"
              variant="primary"
              disabled={userDataLoading}
              fullWidth
            >
              {userDataLoading ? "Salvando..." : "Salvar e Continuar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

UserDataModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default UserDataModal;
