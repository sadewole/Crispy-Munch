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
        const token = Helper.generateToken(result.rows[0]);
        res.status(200).json({
          TYPE: 'POST',
          status: 200,
          data: result.rows[0],
          token,
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
        data: req.user,
        token
      });
    }
  }

  static secret(req, res) {
    res.status(200).json({
      TYPE: 'GET',
      data: req.user.rows[0],
      status: 200,
      secret: 'resource'
    });
  }

  static logout(req, res) {
    res.status(200).json({
      TYPE: 'GET',
      status: 200,
      token: 'null',
      message: 'Logout successfully'
    });
  }
}

export default AuthController;
