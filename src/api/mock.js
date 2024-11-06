// Mock de dados do usuário
const mockUser = {
  email: "pablo@gmail.com",
  name: "Pablo Henrique Domingues Monteiro",
  username: "pablohenriq",
  firstAccess: true, // Simulando que o usuário está fazendo o primeiro acesso
  // Adicione outros campos que você espera do backend, como foto do perfil, roles, etc.
};

const mockLogin = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === mockUser.email && password === "Pablo@1234") {
        resolve(mockUser);
      } else {
        reject(new Error("Credenciais inválidas"));
      }
    }, 1000); // Simula um atraso de 1 segundo para a "requisição"
  });
};
