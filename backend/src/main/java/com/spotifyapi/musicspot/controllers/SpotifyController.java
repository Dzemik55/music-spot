package com.spotifyapi.musicspot.controllers;

import com.spotifyapi.musicspot.services.SpotifyApiService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import se.michaelthelin.spotify.model_objects.specification.Track;

import java.util.List;

@RestController
@RequestMapping("/spotify")
public class SpotifyController {

    private final SpotifyApiService spotifyApiService;

    public SpotifyController(SpotifyApiService spotifyApiService) {
        this.spotifyApiService = spotifyApiService;
    }

    @GetMapping("/tracks/search")
    public List<Track> searchTracks(@RequestParam(name = "q") String query) {
        return spotifyApiService.searchTracks(query);
    }
}
