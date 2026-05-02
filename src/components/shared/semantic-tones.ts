export const semanticTones = {
  primary: {
    soft: "bg-primary/10 text-primary",
    solid: "bg-primary text-primary-foreground",
  },
  secondary: {
    soft: "bg-secondary/10 text-secondary",
    solid: "bg-secondary text-secondary-foreground",
  },
  info: {
    soft: "bg-info/10 text-info",
    solid: "bg-info text-info-foreground",
  },
  success: {
    soft: "bg-success/10 text-success",
    solid: "bg-success text-success-foreground",
  },
  warning: {
    soft: "bg-warning/10 text-warning",
    solid: "bg-warning text-warning-foreground",
  },
  danger: {
    soft: "bg-destructive/10 text-destructive",
    solid: "bg-destructive text-destructive-foreground",
  },
  muted: {
    soft: "bg-muted text-muted-foreground",
    solid: "bg-muted text-muted-foreground",
  },
} as const;
