<template>
  <div>
    <div id="footer">
      <div class="contact-us">
        <div class="container">
          <div class="title">聯絡我們</div>
          <div class="info">
            <div class="address">
              <div class="icon"><i class="fas fa-map-marker-alt"></i></div>
              <p>台北市南港區忠孝東路五段000號一樓</p>
            </div>
            <div class="phone">
              <div class="icon"><i class="fas fa-phone"></i></div>
              <a href="tel:+886-2-1234567">02-1234567</a>
            </div>
            <div class="email">
              <div class="icon"><i class="far fa-envelope"></i></div>
              <a href="mailto:emailaddress@gmail.com">emailaddress@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
      <div class="social-media">
        <ul class="d-flex justify-content-center align-items-center">
          <li><a href="#"><i class="fab fa-facebook"></i></a></li>
          <li><a href="#"><i class="fab fa-instagram-square"></i></a></li>
          <li><a href="#"><i class="fab fa-line"></i></a></li>
          <li><a href="#"><i class="fab fa-youtube"></i></a></li>
          <li><a href="#"><i class="fab fa-twitter"></i></a></li>
          <li><a href="#"><i class="fab fa-google-plus"></i></a></li>
        </ul>
      </div>
      <div class="copy-right">
        <div class="container">
          <p> Copyright © 2020 All rights reserved | This template is made with <a href="https://colorlib.com/">Colorlib</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #footer .contact-us .title{
  text-align: center;
  font-size: 30px;
  font-weight: 800;
  margin-bottom: 15px;
  margin-top: 50px;
}

#footer .contact-us .info{
  text-align: center;
}

#footer .contact-us .info,#footer .contact-us .info a{
  color: #6c757d;
}

#footer .contact-us .info>div{
  position: relative;
}

#footer .contact-us .info .icon{
  display: inline-block;
  color: #b8860b;
}

#footer .contact-us .info p{
  padding-left: 10px;
  margin-bottom: 10px;
  display: inline-block;
}

#footer .contact-us .info .phone a,#footer .contact-us .info .email a{
  display: block;
  padding-left: 10px;
  margin-bottom: 10px;
  display: inline-block;
}

#footer .social-media{
  margin-bottom: 50px;
}

#footer .social-media ul li{
  margin: 0 10px;
}

#footer .social-media ul li a{
  color: #5c626e;
  font-size: 25px;
}

#footer .copy-right{
  text-align: center;
  color: #6c757d;
}
</style>

<script>

export default {
  
}
</script>