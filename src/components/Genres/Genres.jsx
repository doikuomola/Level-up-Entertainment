import { Chip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect } from "react";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#fff" },
    },
});

const Genres = ({
    type,
    selectedGenres,
    genres,
    setGenres,
    setSelectedGenres,
    setPage,
}) => {
    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    };
    const handleRemove = (genre) => {
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
    };

    const fetchGenres = async () => {
        try {
            const { data } = await axios.get(
                // `https://api.themoviedb.org/3/genre/${type}/list/?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
                `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&${type}`
            );
            setGenres(data.genres);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchGenres();
        return () => {
            setGenres({});
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setGenres]);

    return (
        <div style={{ padding: "6px 0" }}>
            {selectedGenres &&
                selectedGenres.map((genre) => (
                    <ThemeProvider theme={darkTheme}>
                        <Chip
                            label={genre.name}
                            style={{ marginRight: 2 }}
                            clickable
                            size="small"
                            color="primary"
                            key={genre.id}
                            onDelete={() => handleRemove(genre)}
                        />
                    </ThemeProvider>
                ))}
            {genres &&
                genres.map((genre) => (
                    <ThemeProvider theme={darkTheme}>
                        <Chip
                            label={genre.name}
                            style={{ marginRight: 2 }}
                            clickable
                            size="small"
                            key={genre.id}
                            onClick={() => handleAdd(genre)}
                        />
                    </ThemeProvider>
                ))}
        </div>
    );
};

export default Genres;
