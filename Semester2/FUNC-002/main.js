//Made by Guzel Garifullina
{
// Дано: функция
    const mixin = function(){
        return this * this;
    };
    console.log(mixin.bind(5)());
}