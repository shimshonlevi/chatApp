import express from 'express';
import { login, register, setAvatar , getAllUsers} from '../controlers/userControler'; // ודא שהנתיב נכון!

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/setAvarter/:id', async (req, res, next) => {
    try {
        console.log("setAvatar",req.params.id);
        
      // כאן אתה יכול להפעיל את הפונקציה setAvatar מבלי שתגורם שגיאה
      await setAvatar(req, res, next);
    } catch (error) {
        console.log("setAvatar error",error);
        
      next(error);
    }
  });

router.get('/allusers/:id', getAllUsers);
export default router;
