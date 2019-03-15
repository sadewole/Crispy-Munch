import uuidv4 from 'uuid/v4';
import db from '../model/index';
import Helper from '../middleware/Helper';

class AuthController {
  /* Create user */
  static signup(req, res) {
    const hash = Helper.hashPassword(req.body.password);
    const newUser = [uuidv4(), req.body.username, req.body.email, hash, 'User'];
    const text =
      'INSERT INTO users(id, username, email, password, role) VALUES($1, $2, $3, $4, $5) returning *';

    db.query(text, newUser)
      .then(result => {
        const token = Helper.generateToken(result.rows[0].id);
        res.status(201).json({
          TYPE: 'POST',
          status: 201,
          data: token,
          message: 'Registered successfully'
        });
      })
      .catch(err => {
        if (err.routine === '_bt_check_unique') {
          return res.status(400).send({ message: 'User with that EMAIL already exist' });
        }
        return res.status(400).json(err);
      });
  }

  static signin(req, res) {
    if (req.user) {
      const token = Helper.generateToken(req.user);

      res.status(200).json({
        TYPE: 'POST',
        status: 200,
        message: 'Login successful',
        data: token
      });
    }
  }

  static secret(req, res) {
    res.send('Hey you requested for secret');
  }
}

export default AuthController;
