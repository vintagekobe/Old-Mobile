import { gql } from "apollo-boost";

export const SEARCH_SPOTIFY = gql`
  query searchSpotify($type: String!, $query: String!) {
    search(type: $type, query: $query) {
      ... on AlbumSearchResult {
        albums {
          items {
            id
            name
            type
            release_date
            artists {
              name
            }
            images {
              url
            }
          }
        }
      }
      ... on ArtistSearchResult {
        artists {
          items {
            id
            type
            name
            images {
              url
            }
          }
        }
      }
      ... on TrackSearchResult {
        tracks {
          items {
            id
            name
            type
            album {
              name
              images {
                url
              }
            }
            artists {
              name
            }
          }
        }
      }
    }
  }
`;
