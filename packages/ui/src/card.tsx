import React, { ReactNode } from "react";

type IconColor = "blue" | "purple" | "green" | "yellow";

export interface CardProps {
  /**
   * Card title
   */
  title: string;
  /**
   * Card description/text
   */
  description: string;
  /**
   * Icon for the card
   */
  icon?: ReactNode;
  /**
   * Color theme for the icon container
   */
  iconColor?: IconColor;
  /**
   * Action buttons or content at the bottom of the card
   */
  footer?: ReactNode;
  /**
   * Additional CSS class names
   */
  className?: string;
  /**
   * Children content to render inside the card
   */
  children?: ReactNode;
}

export const Card = ({
  title,
  description,
  icon,
  iconColor = "blue",
  footer,
  className = "",
  children,
}: CardProps) => {
  return (
    <div className={`card ${className}`}>
      {icon && (
        <div className={`icon-container ${iconColor}`}>
          {icon}
        </div>
      )}
      <h3 className="card-title">{title}</h3>
      <p className="card-text">{description}</p>
      
      {children}
      
      {footer && <div className="button-container">{footer}</div>}

      <style>
        {`
          .card {
            background-color: #1f2937;
            border-radius: 0.75rem;
            padding: 2rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            border: 1px solid #374151;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .card:hover {
            transform: translateY(-8px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }

          .icon-container {
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
          }

          .blue {
            background-color: rgba(59, 130, 246, 0.1);
            color: #60a5fa;
          }

          .purple {
            background-color: rgba(167, 139, 250, 0.1);
            color: #a78bfa;
          }

          .green {
            background-color: rgba(16, 185, 129, 0.1);
            color: #34d399;
          }

          .yellow {
            background-color: rgba(245, 158, 11, 0.1);
            color: #fbbf24;
          }

          .card-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
            text-align: center;
          }

          .card-text {
            color: #9ca3af;
            margin-bottom: 1.5rem;
            text-align: center;
          }

          .button-container {
            margin-top: auto;
          }
        `}
      </style>
    </div>
  );
};
