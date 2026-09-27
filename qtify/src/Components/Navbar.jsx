import React, { useEffect, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from "@mui/material";
import Search from "./Search";
import logoImage from "../assets/logo.png";

const API_URLS = [
  "https://qtify-backend.labs.crio.do/albums/top",
  "https://qtify-backend.labs.crio.do/albums/new",
];

function Navbar() {
  const [searchData, setSearchData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchSearchAlbums = async () => {
      try {
        const responses = await Promise.all(API_URLS.map((url) => fetch(url)));
        const payloads = await Promise.all(responses.map((response) => response.json()));

        const albums = payloads.flatMap((payload) => {
          const items = Array.isArray(payload) ? payload : payload?.albums || payload?.data || [];
          return Array.isArray(items) ? items : [];
        });

        const uniqueAlbums = new Map();
        albums.forEach((album) => {
          if (album?.slug && !uniqueAlbums.has(album.slug)) {
            uniqueAlbums.set(album.slug, album);
          }
        });

        setSearchData(Array.from(uniqueAlbums.values()));
      } catch (error) {
        console.error("Error fetching search albums:", error);
        setSearchData([]);
      }
    };

    fetchSearchAlbums();
  }, []);

  const searchPlaceholder = useMemo(() => "Search an album of your choice", []);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#34C94B",
          height: 74,
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            gap: 2,
            px: 4,
            minHeight: 74,
          }}
        >
          <RouterLink to="/" style={{ display: "flex", alignItems: "center" }}>
            <img src={logoImage} alt="Qtify logo" style={{ width: 67, height: 35, objectFit: "contain", display: "block" }}/>
          </RouterLink>

          <Search searchData={searchData} placeholder={searchPlaceholder} />

          <Button
            variant="contained"
            onClick={() => setIsDialogOpen(true)}
            sx={{
              textTransform: "none",
              backgroundColor: "#000000",
              borderRadius: "12px",
              fontSize:"18px",
              fontWeight:600,
              width: "170px",
              color: "#34C94B",
              boxShadow: "none",
              '&:hover': {
                backgroundColor: "#000000",
              },
            }}
          >
            Give Feedback
          </Button>
        </Toolbar>
      </AppBar>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        PaperProps={{
          sx: {
            width: 640,
            height: 524,
            maxWidth: 640,
            borderRadius: '16px',
            backgroundColor: '#1E1E1E',
            color: '#fff',
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ fontSize: '28px', fontWeight: 700, pb: 1, color: '#fff' }}>
          Feedback
        </DialogTitle>

        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  color: '#000',
                },
                '& label': { color: '#000' },
                '& fieldset': { borderColor: '#34C94B' },
              }}
            />

            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  color: '#000',
                },
                '& label': { color: '#000' },
                '& fieldset': { borderColor: '#34C94B' },
              }}
            />

            <TextField
              label="Subject"
              variant="outlined"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  color: '#000',
                },
                '& label': { color: '#000' },
                '& fieldset': { borderColor: '#34C94B' },
              }}
            />

            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              minRows={5}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  color: '#000',
                },
                '& label': { color: '#000' },
                '& fieldset': { borderColor: '#34C94B' },
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={() => setIsDialogOpen(false)}
            sx={{
              backgroundColor: '#34C94B',
              color: '#000',
              borderRadius: '12px',
              fontWeight: 700,
              width: '100%',
              height: '48px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#2fc440',
              },
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Navbar;