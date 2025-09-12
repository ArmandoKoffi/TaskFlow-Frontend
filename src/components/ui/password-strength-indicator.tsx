import React from 'react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface PasswordStrengthIndicatorProps {
  password: string;
  className?: string;
}

export interface PasswordStrength {
  score: number; // 0-3 (0: faible, 1: faible, 2: moyen, 3: fort)
  label: string;
  color: string;
  isValid: boolean;
}

export const getPasswordStrength = (password: string): PasswordStrength => {
  let score = 0;
  
  // Minimum 8 caractères
  if (password.length >= 8) score++;
  
  // Une minuscule
  if (/[a-z]/.test(password)) score++;
  
  // Une majuscule
  if (/[A-Z]/.test(password)) score++;
  
  // Un chiffre
  if (/\d/.test(password)) score++;
  
  // Caractère spécial (optionnel pour fort)
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  
  // Réajustement du score
  let finalScore = 0;
  let label = '';
  let color = '';
  let isValid = false;
  
  if (password.length === 0) {
    finalScore = 0;
    label = '';
    color = 'transparent';
    isValid = false;
  } else if (password.length < 8 || score < 3) {
    finalScore = 1;
    label = 'Faible';
    color = 'hsl(var(--destructive))';
    isValid = false;
  } else if (score === 3) {
    finalScore = 2;
    label = 'Moyen';
    color = 'hsl(var(--warning))';
    isValid = true;
  } else if (score >= 4 || (score === 3 && hasSpecialChar)) {
    finalScore = 3;
    label = 'Fort';
    color = 'hsl(var(--success))';
    isValid = true;
  }
  
  return { score: finalScore, label, color, isValid };
};

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
  className
}) => {
  const strength = getPasswordStrength(password);
  
  if (!password || password.length === 0) {
    return null;
  }
  
  const progressValue = (strength.score / 3) * 100;
  
  return (
    <div className={cn("space-y-2", className)}>
      <Progress 
        value={progressValue} 
        className="h-2"
        style={{
          backgroundColor: 'hsl(var(--muted))'
        }}
      />
      <div className="flex items-center justify-between text-sm">
        <span 
          className="font-medium"
          style={{ color: strength.color }}
        >
          {strength.label}
        </span>
        <div className="text-xs text-muted-foreground">
          {password.length < 8 && '8+ caractères requis'}
          {password.length >= 8 && !/[a-z]/.test(password) && 'Minuscule requise'}
          {password.length >= 8 && /[a-z]/.test(password) && !/[A-Z]/.test(password) && 'Majuscule requise'}
          {password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && !/\d/.test(password) && 'Chiffre requis'}
        </div>
      </div>
    </div>
  );
};