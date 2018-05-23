# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

League.destroy_all

League.create!([{
  name: "Major League Baseball",
  canonical: "mlb",
  website: "https://www.mlb.com/",
  short_name: "MLB",
},
{
  name: "National Basketball Association",
  canonical: "nba",
  website: "https://www.nba.com/",
  short_name: "NBA",
},
{
  name: "National Hockey League",
  canonical: "nhl",
  website: "https://www.nhl.com/",
  short_name: "NHL",
},
{
  name: "Major League Soccer",
  canonical: "mls",
  website: "https://www.mlssoccer.com/",
  short_name: "MLS",
}])
