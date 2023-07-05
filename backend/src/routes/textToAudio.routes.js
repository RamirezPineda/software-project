import { Router } from "express";
import textToAudioController from '../controllers/textToAudio.controller.js'
const router = Router();

router.post("/textToAudio", textToAudioController.generarAudio);

export default router;