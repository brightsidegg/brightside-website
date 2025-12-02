'use client';

import { motion } from 'framer-motion';

interface Step {
  number: number;
  title: string;
  status: 'completed' | 'active' | 'pending' | 'error';
}

interface StepIndicatorProps {
  steps: Step[];
  onStepClick?: (stepNumber: number) => void;
}

export default function StepIndicator({ steps, onStepClick }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          {/* Step Circle */}
          <motion.button
            onClick={() => onStepClick?.(step.number)}
            disabled={step.status === 'pending'}
            whileHover={step.status !== 'pending' ? { scale: 1.05 } : {}}
            whileTap={step.status !== 'pending' ? { scale: 0.95 } : {}}
            className={`
              relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full font-sf-pro-rounded font-semibold text-sm sm:text-base
              transition-all duration-300
              ${step.status === 'completed' 
                ? 'bg-green-500 text-white' 
                : step.status === 'active'
                ? 'bg-gradient-to-br from-[#FF4D1B] to-[#FF6401] text-white shadow-lg'
                : step.status === 'error'
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-400'
              }
              ${step.status === 'pending' ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {step.status === 'completed' ? (
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : step.status === 'error' ? (
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <span>{step.number}</span>
            )}
          </motion.button>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className={`
              w-8 sm:w-16 h-0.5 mx-1 sm:mx-2 transition-all duration-300
              ${steps[index + 1].status === 'completed' || steps[index + 1].status === 'active'
                ? 'bg-gradient-to-r from-[#FF4D1B] to-[#FF6401]'
                : 'bg-gray-200'
              }
            `} />
          )}
        </div>
      ))}
    </div>
  );
}

