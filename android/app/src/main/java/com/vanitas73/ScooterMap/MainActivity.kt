package com.vanitas73.scootermap

import android.os.Build
import android.os.Bundle
import org.devio.rn.splashscreen.SplashScreen

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import expo.modules.ReactActivityDelegateWrapper

class MainActivity : ReactActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    // Mostrar el splash screen
    SplashScreen.show(this)

    // Establecer el tema antes de la creación de la actividad
    setTheme(R.style.AppTheme)

    // Llamar al método onCreate de la superclase con el parámetro adecuado
    super.onCreate(savedInstanceState)
  }

  /**
   * Devuelve el nombre del componente principal registrado desde JavaScript. 
   * Esto se usa para programar la renderización del componente.
   */
  override fun getMainComponentName(): String = "main"

  /**
   * Devuelve la instancia de [ReactActivityDelegate]. 
   * Usamos [DefaultReactActivityDelegate] para permitir habilitar la nueva arquitectura.
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return ReactActivityDelegateWrapper(
          this,
          BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
          object : DefaultReactActivityDelegate(
              this,
              mainComponentName,
              fabricEnabled
          ){})
  }

  /**
    * Alinea el comportamiento del botón de retroceso con Android S, 
    * donde se mueven las actividades raíz al fondo en lugar de finalizarlas.
    */
  override fun invokeDefaultOnBackPressed() {
      if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
          if (!moveTaskToBack(false)) {
              // Para actividades no raíz, usa la implementación predeterminada para finalizarlas.
              super.invokeDefaultOnBackPressed()
          }
          return
      }

      // Usa la implementación predeterminada en Android S
      super.invokeDefaultOnBackPressed()
  }
}
