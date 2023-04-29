const { Movie } = require("../../database/models");


module.exports = {
    getAll:async (req, res) => {
        const MOVIES = await Movie.findAll();
        return res.status(200).json({
              meta: {
                    status: 200,
                    total: MOVIES.length,
                    url: "api/movies",
              },
              data: MOVIES,
        });
    },
    getOne: async (req, res) => {
        const MOVIES_ID = req.params.id;

        try {
            const MOVIES = await Movie.findByPk(MOVIES_ID);

            if (MOVIES !== null){
                const RESPONSE = {
                    endpoint: `/movie/${MOVIES_ID}`,
                    data: MOVIES,
                }

                return res.status(200).json(RESPONSE);
            }

            return res.status(400).json(`El producto con id: ${MOVIES_ID} no existe`);

        } catch (error) {
            return res.status(500).send(error);
        }
    },
        store: async (req, res) => {
       
          const { title, rating, release_date, length, awards, genre_id } = req.body;
            
          try {
            const RESULT = await Movie.create({
                title,
                rating,
                awards,
                release_date,
                length,
                genre_id
            });
            return res.status(201).json({
                meta:{
                    status:201,
                    url: "api/movies/create",
                    msg: "Pelicula agregada correctamente",
                },
                data: RESULT,
            });
        } catch(error){}

    },
    destroy: async (req, res) => {
        const RESULT = await Movie.destroy({
              where: { id: req.params.id },
        });
        if (RESULT === 1) {
              RESPONSE = {
                    meta: {
                          status: 201,
                          url: "api/movies/delete/:id",
                          msg: "Pelicula Eliminada",
                    },
              };
        } else {
              RESPONSE = {
                    meta: {
                          status: 201,
                          url: "api/movies/delete/:id",
                          msg: "Pelicula No encontrada",
                    },
              };
        }
        return res.status(201).json(RESPONSE);
  },
}


