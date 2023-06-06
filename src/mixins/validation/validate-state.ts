import { getPropByPath } from 'src/helpers/object-helpers';

export function useValidateState(v$) {
  const validateState = (name: string) => {
    // NOTE: if there are no vuealidate model, return
    if (!getPropByPath(v$.value, name)) {
      return true;
    }

    const { $dirty, $error } = getPropByPath(v$.value, name);

    return $dirty ? !$error : null; // if form is touched return error state
  };

  return { validateState };
}
