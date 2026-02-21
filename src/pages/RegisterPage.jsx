import { useState, useEffect } from "react";
import {
  useNavigate,
  Link,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { resolvePostAuthDestination } from "../utils/postAuthRedirect";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
import Input from "../components/Input";
import "./RegisterPage.css";
import { saveUserData } from "../services/api";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, setUserData, setIsRegistering } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Redirect to resolved destination if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate(resolvePostAuthDestination(searchParams));
    }
  }, [user, navigate, loading, searchParams]);

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);
    setIsRegistering(true);

    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      // Update profile with full name
      await updateProfile(userCredential.user, {
        displayName: data.fullName,
      });

      // Get authentication token
      const token = await userCredential.user.getIdToken();

      const response = await saveUserData(
        {
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          id: userCredential.user.uid,
        },
        token,
      );

      setUserData(response);

      // Navigate to resolved post-auth destination
      navigate(resolvePostAuthDestination(searchParams));

      // Navigate to app (AuthContext will handle the state update)
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
      setIsRegistering(false);
    }
  };

  const getErrorMessage = (code) => {
    const errorMessages = {
      "auth/email-already-in-use": "Este email já está em uso",
      "auth/invalid-email": "Email inválido",
      "auth/operation-not-allowed": "Operação não permitida",
      "auth/weak-password": "Senha muito fraca (mínimo 6 caracteres)",
      "auth/user-disabled": "Usuário desabilitado",
      "auth/missing-email": "Email é obrigatório",
    };
    return errorMessages[code] || "Erro ao criar conta. Tente novamente.";
  };

  return (
    <div className="register-container">
      <div className="register-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="register-card">
        <div className="register-header">
          <h1 className="register-title gradient-text">Mada</h1>
          <p className="register-subtitle">Crie sua conta para começar</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          <Input
            id="fullName"
            label="Nome completo"
            placeholder="Seu nome completo"
            error={errors.fullName?.message}
            {...register("fullName", {
              required: "Nome completo é obrigatório",
              validate: (value) => {
                const words = value.trim().split(/\s+/);
                return (
                  (words.length >= 2 && value.length >= 3) ||
                  "Informe seu nome e sobrenome"
                );
              },
            })}
            disabled={loading}
          />

          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="seu@email.com"
            error={errors.email?.message}
            {...register("email", {
              required: "Email é obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
            disabled={loading}
          />

          <Input
            id="phone"
            label="Telefone"
            placeholder="(11) 99999-9999"
            error={errors.phone?.message}
            {...register("phone", {
              required: "Telefone é obrigatório",
              pattern: {
                value: /^\(?[1-9]{2}\)?\s?9?[0-9]{4}-?[0-9]{4}$/,
                message: "Telefone inválido (mínimo 10-11 dígitos)",
              },
            })}
            disabled={loading}
          />

          <Input
            id="password"
            label="Senha"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password", {
              required: "Senha é obrigatória",
              minLength: {
                value: 6,
                message: "A senha deve ter no mínimo 6 caracteres",
              },
            })}
            disabled={loading}
          />

          <Button type="submit" variant="primary" loading={loading}>
            Criar conta
          </Button>
        </form>

        <div style={{ textAlign: "center", marginTop: "var(--spacing-lg)" }}>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
            }}
          >
            Já tem uma conta?{" "}
            <Link
              to={`/login${location.search}`}
              style={{
                color: "var(--color-accent-primary)",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
