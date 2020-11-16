import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    // chamando o metodo init da classe super model
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // só vai existir do lado do codigo
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize, // configuração do banco
      }
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8); // força da criptografia
      }
    });

    return this;
  }

  // posso criar metodos na model
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
