package com.spotifyapi.musicspot.services;

import com.neovisionaries.i18n.CountryCode;
import org.apache.hc.core5.http.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.specification.Paging;
import se.michaelthelin.spotify.model_objects.specification.Track;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class SpotifyApiService {

    private static final Logger logger = LoggerFactory.getLogger(SpotifyApiService.class);

    private final SpotifyAuthService spotifyAuthService;

    public SpotifyApiService(SpotifyAuthService spotifyAuthService) {
        this.spotifyAuthService = spotifyAuthService;
    }

    public List<Track> searchTracks(String query) {
        try {
            spotifyAuthService.ensureAccessToken();
            Paging<Track> tracksPaging = spotifyAuthService.getSpotifyApi()
                    .searchTracks(query)
                    .limit(10)
                    .offset(5)
                    .market(CountryCode.PL)
                    .build()
                    .execute();
            return Arrays.asList(tracksPaging.getItems());
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            logger.error("Error searching tracks: {}", e.getMessage());
            return Collections.emptyList();
        }
    }
}