cp .env.exemple .env
read .p "Configuration du fichier d'environnement ? (y/n) " env
if [ $env == "y" ]
then
    read -p "Adresse email: " email
    read -p "Mot de passe: " password
    read -p "Port: " port
    read -p "Nom d'utilisateur: " username

    sed -i "s/MAIL_USERNAME=.*/MAIL_USERNAME=\"$email\"/" .env
    sed -i "s/MAIL_PASSWORD=.*/MAIL_PASSWORD=\"$password\"/" .env
    sed -i "s/MAIL_PORT=.*/MAIL_PORT=\"$port\"/" .env
    sed -i "s/MAIL_DISPLAY=.*/MAIL_DISPLAY=\"$username <$email>\"/" .env

    ln -s ${PWD}/.env ${PWD}/client/.env
    ln -s ${PWD}/.env ${PWD}/api/.env
fi

cd ${PWD}/client
echo "Installation des dépendances du client"
npm install

cd ${PWD}/api
echo "Installation des dépendances de l'API"
npm install

echo "Configuration terminée"
echo "Vous pouvez ajuster les paramètres dans le fichier .env"