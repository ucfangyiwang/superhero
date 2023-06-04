import { GraphQLError } from 'graphql';
import { searchHeroByname} from './../controller/hero.js'
import {searchHeroById}from './../controller/hero.js'
import { editHero } from './../controller/hero.js';
import { saveHero } from './../controller/hero.js';
import { unsaveHero } from './../controller/hero.js';
import { getSavedHeroes } from './../controller/hero.js';
export const resolvers ={
    Query:{
        searchHerobyName:async(_root,{name})=>{
            const heroes = await searchHeroByname(name)
            return heroes
        },
        searchHerobyId:async(_root,{id})=>{
            const heroes = await searchHeroById(id)
            return heroes
        },
        getSaveHeros:async()=>{
          const heros= await getSavedHeroes()
          return heros
        }
    },
    Mutation:{
        editHero:async(_root,{input:{id,name, powerstats,image}})=>{
            const eidthero = await editHero(id,name, powerstats,image)
            return eidthero
        },
        saveHero:async(_root,{input:{id,name,powerstats,image}})=>{
            const savehero = await saveHero(id,name,powerstats,image)
            return savehero
        },
        deleteHerofromSave:async(_root,{id})=>unsaveHero(id),
        
    }
}