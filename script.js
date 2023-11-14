async function generateRandom() {
    try {
      const arrays = ["array1", "array2", "array3", "array4"];
  
      const randomEntries = await Promise.all(arrays.map(async (array, index) => {
        const response = await fetch(`${array}.txt`);
  
        if (!response.ok) {
          throw new Error(`Failed to fetch ${array}: ${response.status} ${response.statusText}`);
        }
  
        const text = await response.text();
        const entries = text.split('\n').map(entry => entry.trim());
        return getRandomEntry(entries);
      }));
  
      const resultElement = document.getElementById('result');
      resultElement.textContent = `${randomEntries.slice(0, 2).join(' ')}${randomEntries.length > 2 ? ',' : ''} ${randomEntries.slice(2).join(' ')}`;
    } catch (error) {
      console.error(error);
    }
  }
  
  function getRandomEntry(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
  