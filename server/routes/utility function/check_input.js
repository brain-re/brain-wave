exports.check_information = function check_information(input_checked){
    resultat = true
    for (var i = 0; i < input_checked.length; i++) {
        if (input_checked[i] === undefined){  
          console.log("[!]check_information, pas suffisamment de données coté client")
          resultat = false
          break;
        }
      }
    return (resultat)
} 
