
import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient('http://localhost:9000/graphql');

export async function searchHeroByname(name) {
  const query = gql`
    query SearchHeroByName($name: String!) {
      heroes: searchHerobyName(name: $name) {
        id
        name
      }
    }
  `;
  const { heroes } = await client.request(query, { name });
  return heroes;
}

export async function searchHeroById(id) {
  const query = gql`
    query SearchHeroById($id: ID!) {
      hero: searchHerobyId(id: $id) {
        id
        name
        powerstats {
          intelligence
          strength
          speed
          durability
          power
          combat
        }
        image {
          url
        }
      }
    }
  `;
  const { hero } = await client.request(query, { id });
  return hero;
}

export async function getSavedHeroes() {
  const query = gql`
    query {
      heroes: getSaveHeros {
        id
        name
        powerstats {
          intelligence
          strength
          speed
          durability
          power
          combat
        }
        image {
          url
        }
      }
    }
  `;
  const { heroes } = await client.request(query);
  return heroes;
}

export async function editHero(input) {
  const mutation = gql`
    mutation EditHero($input: HeroInput!) {
      hero: editHero(input: $input) {
        id
        name
        powerstats {
          intelligence
          strength
          speed
          durability
          power
          combat
        }
        image {
          url
        }
      }
    }
  `;
  const { hero } = await client.request(mutation, { input });
  return hero;
}

export async function saveHero(input) {
  const mutation = gql`
    mutation SaveHero($input: HeroInput!) {
      hero: saveHero(input: $input) {
        id
        name
      }
    }
  `;
  const { hero } = await client.request(mutation, { input });
  return hero;
}

export async function unsaveHero(id) {
  const mutation = gql`
    mutation DeleteHerofromSave($id: ID!) {
        hero: deleteHerofromSave(id: $id){
            id
        }
    }
  `;
  const { hero } = await client.request(mutation, { id });
  return hero;
}
