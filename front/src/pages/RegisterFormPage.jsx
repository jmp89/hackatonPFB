const RegisterFormPage = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form action="/submit" method="post" className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">REGISTRARSE</h1>

        <div className="mb-4">
          <label htmlFor="username" className="block text-lg font-medium mb-2">Usuario</label>
          <input type="text" id="username" name="username" placeholder="Nombre de usuario" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" required />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
          <input type="email" id="email" name="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" required />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-lg font-medium mb-2">Contraseña</label>
          <input type="password" id="password" name="password" placeholder="Contraseña" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" required />
        </div>

        <div className="mb-4">
          <label htmlFor="confirm_password" className="block text-lg font-medium mb-2">Repetir contraseña</label>
          <input type="password" id="confirm_password" name="confirm_password" placeholder="Repetir contraseña" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" required />
        </div>

        <button type="submit" className="w-full bg-black text-white py-2 rounded-lg font-bold text-lg mb-4">REGISTRARSE</button>

        <div className="text-sm text-gray-700">
          <h2 className="text-lg font-bold mb-2">Políticas de usuario</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Al registrarse en hackathon.com, usted acepta estos términos y condiciones. Si no está de acuerdo, no complete el registro.</li>
            <li>Debe ser mayor de 18 años o tener consentimiento parental para registrarse.</li>
            <li>Proporcione información precisa y actualizada. Mantenga su contraseña segura y notifique cualquier uso no autorizado de su cuenta.</li>
            <li>Su información se manejará según nuestra <a href="#" className="text-blue-500">Política de Privacidad</a>. No compartiremos su información sin su consentimiento, excepto por exigencias legales.</li>
            <li>No use cuentas de terceros, no proporcione información falsa, ni realice actividades ilegales en el sitio.</li>
            <li>Podemos cancelar su cuenta por violaciones de estos términos. Usted puede cancelarla contactando a soporte@hackathon.com.</li>
            <li>Podemos modificar estos términos en cualquier momento. Revise estos términos periódicamente para estar al tanto de cambios.</li>
            <li>Para preguntas, contáctenos en soporte@hackathon.com.</li>
          </ol>
        </div>
      </form>
    </main>
  );
}

export default RegisterFormPage;
