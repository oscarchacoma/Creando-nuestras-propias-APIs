const { Genre } = require("../../database/models");

module.exports = {
    list: async (req, res) => {
        try {
            const GENRE = await Genre.findAll();
            
            const RESPONSE = {
                meta: {
                    status: 200,
                    total: GENRE.length,
                    url: "api/genres"
                },
                data: GENRE,
                
            };

            res.status(200).json(RESPONSE);

        } catch (error) {
            res.status(500).send(error);
        }
    },
    detail: async (req, res) => {
        const GENRE_ID = req.params.id;

        try {
            const GENRE = await Genre.findByPk(GENRE_ID);

            if (GENRE !== null){
                const RESPONSE = {
                    endpoint: `/genres/${GENRE_ID}`,
                    data: GENRE,
                }

                return res.status(200).json(RESPONSE);
            }

            return res.status(400).json(`El genero con id: ${GENRE_ID} no existe`);

        } catch (error) {
            return res.status(500).send(error);
        }
       /* ----------------*/
       
    },
}