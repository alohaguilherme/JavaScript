HTMLFormElement.prototype.save = function(){
  
   let form = this;

   return new Promise((resolve, reject)=>{
        form.addEventListener('submit', e => {

            e.preventDefault();
    
            let formData = new FormData(form);
            
            fetch("/admin/criancas", { 
        
                method: 'POST',
                body: formData 
        
            }).then(response => response.json())
            .then(json => {
                
                resolve(json);
            
            }).catch(err=>{
            
                reject(err);
            
            });
        });
   })


}