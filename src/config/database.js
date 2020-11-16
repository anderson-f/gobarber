module.exports = {
  dialect: "postgres",
  host: "localhost",
  port: 5433,
  username: "postgres",
  password: "docker",
  database: "gobarber",
  define: {
    timestamps: true, // define os timestamps created at e updated at
    underscored: true, // separado por _ os nomes de tabelas
    underscoredAll: true, // separado por _ os nomes de atributos
  },
};
