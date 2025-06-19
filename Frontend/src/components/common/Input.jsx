import * as React from "react";
import { styled } from "@mui/material/styles";
import { cn } from "../../util/util";

const StyledInput = styled("input")(({ theme }) => ({
  height: "40px",
  width: "100%",
  padding: "8px 12px",
  borderRadius: "6px",
  border: `1px solid ${theme.palette.grey[400]}`,
  fontSize: "1rem",
  backgroundColor: "transparent",
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[1],
  transition: "all 0.2s ease",

  "&:focus": {
    outline: "none",
   boxShadow: `0 0 0 2px rgba(215, 38, 61, 0.6)`, // 🔴 soft focus outline (optional)
  },

  "&::placeholder": {
    color: theme.palette.text.secondary,
    opacity: 0.7,
  },

  "&:disabled": {
    cursor: "not-allowed",
    opacity: 0.5,
  },
}));

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <StyledInput
      type={type}
      className={cn(className)}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
