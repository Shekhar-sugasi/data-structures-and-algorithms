class HashMap {
  constructor(size = 16) {
    this.buckets = new Array(size);
    this.size = size;
    this.loadFactor = 0.75;
    this.count = 0;
  }

  hash(key) {
    let hasCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hasCode = (primeNumber * hasCode + key.charCodeAt(i)) % this.size;
    }
    return hasCode;
  }

  set(key, value) {
    const index = this.hash(key);
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    for (let pair of this.buckets[index]) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    this.buckets[index].push([key, value]);
    this.count++;

    if (this.count / this.size > this.loadFactor) {
      this.resize();
    }
  }

  resize() {
    const oldBuckets = this.buckets;
    this.size *= 2;
    this.buckets = new Array(this.size);
    this.count = 0;

    for (let bucket of oldBuckets) {
      if (bucket) {
        for (let pair of bucket) {
          this.set([pair[0], pair[1]]);
        }
      }
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (!bucket) return null;

    for (let pair of bucket) {
      if (pair[0] === key) {
        return pair[1];
      }
    }
    return null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (!bucket) return false;

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.count--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.count;
  }

  clear() {
    this.buckets = new Array(this.size);
    this.count = 0;
  }

  keys() {
    const keysArray = [];
    for (let bucket of this.buckets) {
      if (bucket) {
        for (let pair of bucket) {
          keysArray.push(pair[0]);
        }
      }
    }
    return keysArray;
  }

  values() {
    const valuesArray = [];
    for (let bucket of this.buckets) {
      if (bucket) {
        for (let pair of bucket) {
          valuesArray.push(pair[1]);
        }
      }
    }
    return valuesArray;
  }

  entries() {
    const entriesArray = [];
    for (let bucket of this.buckets) {
      if (bucket) {
        for (let pair of bucket) {
          entriesArray.push(pair);
        }
      }
    }
    return entriesArray;
  }
}

// Testing the HashMap
const hashMap = new HashMap();
hashMap.set("apple", "red");
hashMap.set("banana", "yellow");
hashMap.set("carrot", "orange");

console.log(hashMap.get("apple"));
console.log(hashMap.entries());
console.log(hashMap);
