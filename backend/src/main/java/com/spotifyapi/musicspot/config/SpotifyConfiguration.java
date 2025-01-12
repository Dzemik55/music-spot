package com.spotifyapi.musicspot.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Component;
import se.michaelthelin.spotify.SpotifyApi;

@Component
public class SpotifyConfiguration {

    private final String clientId;
    private final String clientSecret;

    public SpotifyConfiguration() {
        Dotenv dotenv = Dotenv.load();
        this.clientId = dotenv.get("SPOTIFY_CLIENT_ID");
        this.clientSecret = dotenv.get("SPOTIFY_CLIENT_SECRET");
    }

    public SpotifyApi getSpotifyObject() {
        return new SpotifyApi
                .Builder()
                .setClientId(clientId)
                .setClientSecret(clientSecret)
                .build();
    }
}
