import bcrypt from "bcryptjs"
import Candidat from "../models/candidat-model"
import jwt from "jsonwebtoken"
export const create = async({req,  res, next}:any) => {

    try {

        const {     
            nom, 
            postnom, 
            prenom,
            email, 
            password, 
            mobile, 
            profession,
            anne_experience,
            adresse
        } = req.body;
        
        // crypt the password
        await bcrypt.hash(password, 16)
            .then(async (hash) => {
                // create a candidat
                const newCandidat = new Candidat({
                    email,
                    password: hash,
                    mobile,
                    nom,
                    postnom,
                    prenom,
                    profession,
                    anne_experience,
                    adresse
                });
                
                const saveCandidat = await newCandidat.save();
                
                return res.status(201).json({
                    candidat: saveCandidat,
                    token: jwt.sign(
                        {email: newCandidat.email},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '24h'}

                    ),
                    success: true
                });

            }).catch(err => res.status(500).json({
                message: err.message,
                success: false
            }));
    } catch (error:any) {
        return res.status(400).json({
            message: error.message,
            success: false
        });
    }    
}

export const candidatLogin = async ({req, res, next}:any) => {

    try {
        // body
        const { email, password } = req.body;

        // find candidat
        const candidat = await Candidat.findOne({ email });
        if(!candidat){
            return res.status(404).json({
                message: 'Candidat not found',
                success: false
            });
        }
        
        // compare passwords
        bcrypt.compare(password, candidat.password)
            .then((valid) => {

                if(!valid) {
                    return res.status(401).json({
                            message: 'Mot de passe incorrect',
                            success: false
                        });
                }
                
                // password is correct, return created token
                return res.status(200).json({
                    candidatId: candidat._id,
                    token: jwt.sign(
                        {candidatId: candidat._id},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '24h'}
                    )
                });
            }).catch(err => res.status(500).json({
                message: err.message,
                success: false
            }));

    } catch (error:any) {
        return res.status(401).json({
            message: error.message,
            success: false
        });
    }

}

export const getAll = async (req:Request, res:Response) => {
    try {
        const allCandidats = await Candidat.find();
        return res.status(200).json(allCandidats);
    } catch (error) {
        return res.status(400).json({ error });
    }
};

export const getOne = async (req:Request, res:Response) => {
    try {
        const candidat = await Candidat.findOne({_id: req.params.id});
        if(!candidat) return res.status(404).json("Ce candidat n'existe pas !");

        return res.status(200).json(candidat);
    } catch (error) {
        return res.status(400).json({ error });
    }
};

export const update = async (req:Request, res:Response) => {
    try {

        const updateCandidat = await Candidat.findOneAndUpdate({ _id: req.params.id }, { ... req.body }, { new: true});
        if(!updateCandidat) return res.status(400).json("Erreur lors de la mise à jour du candidat!");

        return res.status(201).json(updateCandidat);
    } catch (error) {
        return res.status(400).json({ error });
    }
};


export const remove = async (req:Request, res:Response) => {
    try {        

        const removeCandidat = await Candidat.findOneAndRemove({ _id: req.params.id });
        if(!removeCandidat) return res.status(404).json("Ce candidat n'existe pas!");

        return res.status(200).json(removeCandidat);
    } catch (error) {
        return res.status(400).json({ error });
    }
}