import React from "react";
import {Card as MuiCard, CardMedia, CardContent,Typography,Chip,} from "@mui/material";

const AlbumCard = ({ image, title, follows = 0, description, onClick }) => {
  return (
    <MuiCard
      onClick={onClick}
      sx={{
        width: 235,
        minWidth: 235,
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: "#fff",
        boxShadow: "none",
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.2s ease",
        "&:hover": onClick
          ? {
              transform: "translateY(-4px)",
            }
          : {},
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          width: "100%",
          height: 230,
          objectFit: "cover",
        }}
      />

      <CardContent
        sx={{
          padding: "10px 10px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          "&:last-child": {
            paddingBottom: "12px",
          },
        }}
      >
        {title && (
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: "#000",
              lineHeight: 1.3,
            }}
          >
            {title}
          </Typography>
        )}

        {description && (
          <Typography
            variant="body2"
            sx={{
              color: "#6b7280",
              lineHeight: 1.4,
            }}
          >
            {description}
          </Typography>
        )}

        <Chip
          label={`${follows} Follows`}
          sx={{
            height: 34,
            backgroundColor: "#151515",
            color: "#fff",
            fontSize: 14,
            fontWeight: 500,
            borderRadius: "18px",
            width: "fit-content",
            px: 0.5,
            "& .MuiChip-label": {
              px: 1.5,
            },
          }}
        />
      </CardContent>
    </MuiCard>
  );
};

export default AlbumCard;
