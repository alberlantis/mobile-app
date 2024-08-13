#!/bin/zsh

# Give permissions
chmod +x increment_version.zsh

# File
ENV_FILE=".env"

# Verifica que el archivo .env existe
if [[ ! -f ${ENV_FILE} ]]; then
  echo ".env file not found!"
  exit 1
fi

# Busca la línea que contiene EXPO_PUBLIC_APP_VERSION y EXPO_PUBLIC_BUILD_VERSION
build_version_line=$(grep "^EXPO_PUBLIC_BUILD_VERSION=" ${ENV_FILE})
app_version_line=$(grep "^EXPO_PUBLIC_APP_VERSION=" ${ENV_FILE})

# Si no encuentra alguna de las líneas, muestra un mensaje y sale del script
if [[ -z "$build_version_line" ]]; then
  echo "EXPO_PUBLIC_BUILD_VERSION not found in ${ENV_FILE}!"
  exit 1
fi

if [[ -z "$app_version_line" ]]; then
  echo "EXPO_PUBLIC_APP_VERSION not found in ${ENV_FILE}!"
  exit 1
fi

# Extrae el valor actual de la versión build
current_build_version=$(echo $build_version_line | cut -d '=' -f 2)
current_app_version=$(echo $app_version_line | cut -d '=' -f2)

# Divide la versión en major, minor y patch
IFS='.' read -r major minor patch <<< "$current_app_version"

# Incrementa la versión basada en el parámetro proporcionado
case $1 in
  major)
    major=$((major + 1))
    minor=0
    patch=0
    ;;
  minor)
    minor=$((minor + 1))
    patch=0
    ;;
  patch)
    patch=$((patch + 1))
    ;;
  *)
    usage
    ;;
esac

# Construye la nueva versión
new_app_version="$major.$minor.$patch"

# Incrementa la versión build
new_build_version=$((current_build_version + 1))

# Reemplaza la versión build y la app version en el archivo .env
sed -i.bak "s/^EXPO_PUBLIC_BUILD_VERSION=.*/EXPO_PUBLIC_BUILD_VERSION=$new_build_version/" ${ENV_FILE}
sed -i '' "s/^EXPO_PUBLIC_APP_VERSION=.*/EXPO_PUBLIC_APP_VERSION=$new_app_version/" ${ENV_FILE}

# Opción de eliminar el archivo de respaldo
rm "${ENV_FILE}.bak"

# echo "Versión incrementada a: $new_app_version"
echo "EXPO_PUBLIC_BUILD_VERSION incremented to $new_build_version"
