
const snowflakes = document.getElementById('snowflakes');

const nr = 9;

// Generate snowflakes
for(let i = 0; i < nr; i++)
{
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '❆';
    snowflakes.appendChild(snowflake);
}

// const snowflakes = document.getElementById('jsi-snows');

// const nr = 100;

// for(let i = 0; i < nr; i++)
// {
//     const snowflake = document.createElement('li');
//     snowflakes.appendChild(snowflake);
// }