import PropTypes from "prop-types";
import "./Stepper.css";

function Stepper({
  steps,
  currentStep,
  onStepChange,
  canGoNext,
  canGoPrevious,
  onNext,
  onPrevious,
  onFinish,
  isLastStep,
  isProcessing = false,
  processingMessage = "Processando...",
}) {
  return (
    <div className="stepper-container">
      {/* Step Indicators */}
      <div className="stepper-header">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;

          return (
            <div key={step.id} className="stepper-step-wrapper">
              {/* Step Circle */}
              <div
                className={`stepper-step ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}
                onClick={() => canGoPrevious && onStepChange(stepNumber)}
              >
                {isCompleted ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M16.6667 5L7.50004 14.1667L3.33337 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span>{stepNumber}</span>
                )}
              </div>

              {/* Step Label */}
              <div className="stepper-label">
                <span className="stepper-label-text">{step.label}</span>
              </div>

              {/* Progress Line */}
              {index < steps.length - 1 && (
                <div
                  className={`stepper-line ${isCompleted ? "completed" : ""}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="stepper-content">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          return (
            <div
              key={step.id}
              className={`stepper-step-content ${currentStep === stepNumber ? "active" : ""}`}
            >
              {step.component}
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="stepper-navigation">
        {currentStep > 1 && (
          <button
            className="stepper-btn stepper-btn-secondary"
            onClick={onPrevious}
            disabled={!canGoPrevious}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Voltar
          </button>
        )}

        <div style={{ flex: 1 }} />

        {isLastStep ? (
          <button
            className="stepper-btn stepper-btn-primary"
            onClick={onFinish}
            disabled={!canGoNext}
          >
            {isProcessing ? (
              <>
                <div className="stepper-spinner" />
                {processingMessage || "Processando..."}
              </>
            ) : (
              <>
                Continuar
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4.16663 10H15.8333M15.8333 10L10 4.16667M15.8333 10L10 15.8333"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </button>
        ) : (
          <button
            className="stepper-btn stepper-btn-primary"
            onClick={onNext}
            disabled={!canGoNext}
          >
            Próximo
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M7.5 5L12.5 10L7.5 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

Stepper.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      component: PropTypes.node.isRequired,
    }),
  ).isRequired,
  currentStep: PropTypes.number.isRequired,
  onStepChange: PropTypes.func.isRequired,
  canGoNext: PropTypes.bool.isRequired,
  canGoPrevious: PropTypes.bool,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  isLastStep: PropTypes.bool.isRequired,
  isProcessing: PropTypes.bool,
  processingMessage: PropTypes.string,
};

export default Stepper;
