import amazonPolly from "../services/amazonPolly.service.js";
import { v4 } from 'uuid';

const generarAudio = async (req, res) => {
    try {
        console.log(req.body);
      const { text, voiceId,languageCode,engine } = req.body;
      new amazonPolly().transform({
        Text: text,
        OutputFormat: 'mp3',
        VoiceId: voiceId,
        LanguageCode: languageCode,
        Engine: engine,
        OutputS3BucketName: process.env.BUCKET || 'aws-sw1',
        OutputS3KeyPrefix: v4(),
        })
        .then((response) => {return res.status(200).json(response);})
        .catch(err => res.status(500).json(err).console.log(err));
      
    } catch (error) {
      console.log("ERROR SERVER!", error);
      return res.status(500).json(error);
    }
  };

  export default { generarAudio };
  
