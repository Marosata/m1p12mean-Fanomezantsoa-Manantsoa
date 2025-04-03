import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <!-- ======= Footer ======= -->
    <footer id="footer">
      <div class="container">
        <h3>Membres du groupe:</h3>
        <h3>ANDRIAMPIANINA Fanomezantsoa Marosata</h3> 
        <h3>MANANTSOA Rakoto Fandresena Justin</h3>
        <br>

        <div class="social-links">
          <a href="#" class="twitter"><i class="bx bxl-twitter"></i></a>
          <a href="#" class="facebook"><i class="bx bxl-facebook"></i></a>
          <a href="#" class="instagram"><i class="bx bxl-instagram"></i></a>
          <a href="#" class="google-plus"><i class="bx bxl-skype"></i></a>
          <a href="#" class="linkedin"><i class="bx bxl-linkedin"></i></a>
        </div>

        <div class="copyright">
          &copy; Copyright <strong><span>2025</span></strong>.
        </div>

        <div class="credits">
          <!-- Licensing information: https://bootstrapmade.com/license/ -->
        </div>
      </div>
    </footer><!-- End Footer -->

    <a href="#" class="back-to-top d-flex align-items-center justify-content-center" (click)="backToTop()">
      <i class="bi bi-arrow-up-short"></i>
    </a>
  `,
  styles: [`
    #footer {
      background: #2c3e50;
      color: white;
      padding: 50px 0;
      text-align: center;
    }

    #footer .social-links a {
      margin: 0 10px;
      color: white;
      font-size: 1.5rem;
    }

    #footer .social-links a:hover {
      color: #ff0;
    }

    #footer .copyright {
      margin-top: 20px;
      font-size: 1rem;
    }

    #footer .credits {
      font-size: 0.9rem;
      color: #b0b0b0;
    }

    #footer .back-to-top {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #2c3e50;
      padding: 10px;
      border-radius: 50%;
      color: white;
      font-size: 1.5rem;
      display: none;
      cursor: pointer;
    }

    #footer .back-to-top:hover {
      background: #ff0;
    }

    #footer .back-to-top.show {
      display: block;
    }
  `]
})
export class FooterComponent {
  // Afficher ou masquer le bouton "Retour en haut"
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.pageYOffset > 300) {
      document.querySelector('.back-to-top')?.classList.add('show');
    } else {
      document.querySelector('.back-to-top')?.classList.remove('show');
    }
  }

  // Fonction pour faire défiler la page vers le haut
  backToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
