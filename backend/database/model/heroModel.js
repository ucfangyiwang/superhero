import DataTypes from 'sequelize'
import database from './../database.js'


const Hero = database.define(
 'hero',
    {
        heroId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
          },
        heroName: {
            type: DataTypes.STRING,
            allowNull: false
          },
        intelligence:{ type:DataTypes.STRING},
        strength: {type:DataTypes.STRING},
        speed: {type:DataTypes.STRING},
        durability: {type:DataTypes.STRING},
        power: {type:DataTypes.STRING},
        combat: {type:DataTypes.STRING},
        imageUrl: {type:DataTypes.STRING},
        isSave: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
          }
    },
    { timestamps: false }
)

export default Hero;