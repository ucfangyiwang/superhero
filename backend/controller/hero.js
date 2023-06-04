import axios from 'axios';
import  Hero  from './../database/model/heroModel.js'

const Token = 1252528515635309
console.log(Token)
export async function searchHeroByname(name){
    const website =`https://superheroapi.com/api/${Token}/search/${name}`
    console.log(website)
    try {
        console.log(Token)
        const response = await axios.get(website);
        if (!response.data.results) {
            throw new Error("No heroes found");
        }
        return response.data.results.map(result => ({
          id: result.id,
          name: result.name,
        }));
      } catch (error) {
        throw new Error(`Failed to fetch heroes: ${error.message}`);
      }
}
export async function searchHeroById(id){
    try{
      const hero = await Hero.findOne({where:{heroId:id}})
      if(hero){
        return {
          id:hero.heroId,
          name:hero.heroName,
          powerstats:{
                intelligence: hero.intelligence,
                strength: hero.strength,
                speed: hero.speed,
                durability: hero.durability,
                power: hero.power,
                combat: hero.combat
          },
          image: {
                url: hero.imageUrl
        }
        }
      }
      else{      
      const website =`https://superheroapi.com/api/${Token}/${id}`
      const response = await axios.get(website);
      if (!response.data.response || response.data.response === "error") {
          throw new Error("No heroes found");
      }
      return {
        id: response.data.id,
        name: response.data.name,
        powerstats: response.data.powerstats,
        image: response.data.image,
      };}

    }catch(error){
        throw new Error(error)
    }

}

export async function editHero(id,name, powerstats,image){
    try{
      let hero = await Hero.findOne({where:{heroId:id}})
      if(hero){
        console.log("find hero");
          hero.intelligence = powerstats.intelligence;
          hero.strength = powerstats.strength;
          hero.speed = powerstats.speed;
          hero.durability = powerstats.durability;
          hero.power = powerstats.power;
          hero.combat = powerstats.combat;
          await hero.save();  
          return {
            id:hero.heroId,
            name:hero.heroName,
            powerstats:{
                  intelligence: hero.intelligence,
                  strength: hero.strength,
                  speed: hero.speed,
                  durability: hero.durability,
                  power: hero.power,
                  combat: hero.combat
            },
            image: {
                  url: hero.imageUrl
          }
          }
      }else{
        console.log("not find hero")
        const newHero = await Hero.create({
          heroId:id,
          heroName:name,
          intelligence:powerstats.intelligence,
          strength:powerstats.strength,
          speed:powerstats.speed,
          durability:powerstats.durability,
          power:powerstats.power,
          combat:powerstats.combat,
          imageUrl:image.url
        })
       
        return {
          id:newHero.heroId,
          name:newHero.heroName,
          powerstats:{
                intelligence: newHero.intelligence,
                strength: newHero.strength,
                speed: newHero.speed,
                durability: newHero.durability,
                power: newHero.power,
                combat: newHero.combat
          },
          image: {
                url: newHero.imageUrl
        }
        }
      }
     
    }catch(error){
        throw new Error(error)
    }


}
export async function saveHero(id, name, powerstats, image) {
  try {
      let hero = await Hero.findOne({where:{heroId:id}})
      if (hero) {
        hero.isSave = "true";
        await hero.save(); 
            return {
            id:hero.heroId,
            name:hero.heroName,
            powerstats:{
                  intelligence: hero.intelligence,
                  strength: hero.strength,
                  speed: hero.speed,
                  durability: hero.durability,
                  power: hero.power,
                  combat: hero.combat
            },
            image: {
                  url: hero.imageUrl
          }
          }
      }
      else{
        console.log("not find hero")
        const  newHero = await Hero.create({
          heroId: id,
          heroName: name,
          intelligence: powerstats.intelligence,
          strength: powerstats.strength,
          speed: powerstats.speed,
          durability: powerstats.durability,
          power: powerstats.power,
          combat: powerstats.combat,
          imageUrl: image.url,
          isSave: "true"
      })
      console.log(newHero)
      return {
        id:newHero.heroId,
        name:newHero.heroName,
        powerstats:{
              intelligence: newHero.intelligence,
              strength: newHero.strength,
              speed: newHero.speed,
              durability: newHero.durability,
              power: newHero.power,
              combat: newHero.combat
        },
        image: {
              url: newHero.imageUrl
      }
      }
      }
        
  } catch (error) {
      throw new Error(error);
  }
}

export async function unsaveHero(id) {
  try {
      let hero = await Hero.findOne({where:{heroId:id}})
      if (hero) {
          hero.isSave= "false";
          await hero.save(); 
      } else {
          console.log(`Hero with ID ${id} not found.`);
      }
  } catch (error) {
      throw new Error(error);
  }
}

export async function getSavedHeroes() {
  try {
      const heroes = await Hero.findAll({where:{isSave:true}})
      if (heroes.length === 0) {
          console.log(`No saved heroes found.`);
          return [];
      }
      const mappedHeroes = heroes.map((hero) => {
        return {
          id: hero.heroId,
          name: hero.heroName,
          powerstats: {
            intelligence: hero.intelligence,
            strength: hero.strength,
            speed: hero.speed,
            durability: hero.durability,
            power: hero.power,
            combat: hero.combat,
          },
          image: {
            url: hero.imageUrl,
          },
        };
      });
      return mappedHeroes;
  } catch (error) {
      throw new Error(error);
  }
}