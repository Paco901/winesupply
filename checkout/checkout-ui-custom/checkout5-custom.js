$(document).ready(function(){
  var org_id_test = "1snn5n9w";
  var org_id_prod = "k8vif92e";
  var merchant_id = "decidir_agregador";

  var CybersourcedeviceFingerprintId = 100000 + Math.floor(Math.random() * 999999);

  console.log("deviceFingerprintId: " + CybersourcedeviceFingerprintId);

  window.vtex.deviceFingerprint = CybersourcedeviceFingerprintId;

  <!-- Profiling Test -->
  var urlpng = "https://h.online-metrix.net/fp/clear.png?org_id=" + org_id_test + "&amp;session_id=" + merchant_id + CybersourcedeviceFingerprintId;
  var urlflash = "https://h.online-metrix.net/fp/fp.swf?org_id=" + org_id_test + "&amp;session_id=" + merchant_id + CybersourcedeviceFingerprintId;
  var urljs = "https://h.online-metrix.net/fp/tags.js?org_id=" + org_id_test + "&amp;session_id=" + merchant_id + CybersourcedeviceFingerprintId;
  <!-- Profiling Production -->
  var urlpngp = "https://h.online-metrix.net/fp/clear.png?org_id=" + org_id_prod + "&amp;session_id=" + merchant_id + CybersourcedeviceFingerprintId;
  var urlflashp = "https://h.online-metrix.net/fp/fp.swf?org_id=" + org_id_prod + "&amp;session_id=" + merchant_id + CybersourcedeviceFingerprintId;
  var urljsp = "https://h.online-metrix.net/fp/tags.js?org_id=" + org_id_prod + "&amp;session_id=" + merchant_id + CybersourcedeviceFingerprintId;
  $('body').prepend('<p style="background:url(' + urlpng + '&amp;m=1)"/><img src="' + urlpng + '&amp;m=2" alt="">'
  + '<object type="application/x-shockwave-flash" data="' + urlflash +'" width="1" height="1" id="thm_fp"><param name="movie" value="' + urlflash + '"/>'
  + '<script type="text/javascript" src="' + urljs + '" />' + '<p style="background:url(' + urlpngp + '&amp;m=1)"/><img src="' + urlpngp + '&amp;m=2" alt="">'
  + '<object type="application/x-shockwave-flash" data="' + urlflashp +'" width="1" height="1" id="thm_fp"><param name="movie" value="' + urlflashp + '"/>'
  + '<script type="text/javascript" src="' + urljsp + '" />');
  });
