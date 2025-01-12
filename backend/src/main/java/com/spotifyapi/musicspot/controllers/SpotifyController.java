package com.spotifyapi.musicspot.controllers;

import com.spotifyapi.musicspot.services.SpotifyApiService;
import org.springframework.web.bind.annotation.*;
import se.michaelthelin.spotify.model_objects.specification.Track;

import java.util.List;

@RestController
@RequestMapping("/spotify")
@CrossOrigin("http://localhost:5174")
public class SpotifyController {

    private final SpotifyApiService spotifyApiService;

    public SpotifyController(SpotifyApiService spotifyApiService) {
        this.spotifyApiService = spotifyApiService;
    }

    @GetMapping("/tracks/search")
    public List<Track> searchTracks(@RequestParam String query) {
        return spotifyApiService.searchTracks(query);
    }
}
