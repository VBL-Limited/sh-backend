import { Request,Response } from "express";
import {Application} from "../models/apply-model"

export const apply = async (req:Request, res:Response) => {
    try {
        const {
            offreId,
            userId
        } = req.body;

        const newApplication = new Application(...req.body);
        if(req.body){
            await newApplication.save();
            return res.status(201).json(newApplication);
        }
    
      } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        return res.status(400).json(errorMessage );
      }
  
};

export const getAllApplications = async (req:Request, res:Response) => {
    try {
        const allApplications = await Application.find();
        return res.status(200).json(allApplications);
    } catch (error:any) {
        return res.status(400).json({ error: error.message });
    }
};

export const getApplication = async (req:Request, res:Response) => {
    try {
        const application = await Application.findOne({ _id: req.params.id });
        if(!application) return res.status(404).json("Cette application n'existe pas !");

        return res.status(200).json(application);
    } catch (error:any) {
        return res.status(400).json({ error: error.message });
    }
};

export const update = async (req:Request, res:Response) => {
    try {
        const {
            offreId,
            userId
        } = req.body;

        const updateApplication = await Application.findOneAndUpdate({ _id: req.params.id }, { ... req.body }, { new: true});
        return res.status(201).json(updateApplication);
    } catch (error:any) {
        return res.status(400).json({ error: error.message });
    }
};


export const remove = async (req:Request, res:Response) => {
    try {        

        const removeApplication = await Application.findOneAndRemove({ _id: req.params.id });
        if(!removeApplication) return res.status(404).json("Cette application n'existe pas!");

        return res.status(200).json(removeApplication);
    } catch (error:any) {
        return res.status(400).json({ error: error.message });
    }
}