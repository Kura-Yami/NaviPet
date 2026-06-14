function areInputsEqual(newArgs, lastArgs, isEqual) {
  if (newArgs.length !== lastArgs.length) {
    return false;
  }

  for (let index = 0; index < newArgs.length; index += 1) {
    if (!isEqual(newArgs[index], lastArgs[index])) {
      return false;
    }
  }

  return true;
}

export default function memoizeOne(resultFn, isEqual = Object.is) {
  let cache = null;

  function memoized(...newArgs) {
    if (
      cache &&
      cache.lastThis === this &&
      areInputsEqual(newArgs, cache.lastArgs, isEqual)
    ) {
      return cache.lastResult;
    }

    const lastResult = resultFn.apply(this, newArgs);
    cache = {
      lastArgs: newArgs,
      lastResult,
      lastThis: this
    };

    return lastResult;
  }

  memoized.clear = () => {
    cache = null;
  };

  return memoized;
}
