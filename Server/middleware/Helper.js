import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../model/index';

class Helper {
  //   Hash password
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  // Check exist email
  static exitEmail(email) {
    const text = `SELECT * from users WHERE email = $1`;
    const confirmCheck = db.query(text, [email]);
    return confirmCheck;
  }

  // Compare password
  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  /**
   * Gnerate Token
   */
  static generateToken(id) {
    const token = jwt.sign(
      {
        iss: 'codeSecret',
        sub: id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
      },
      process.env.JWT_SECRET
    );
    return token;
  }
}

export default Helper;
