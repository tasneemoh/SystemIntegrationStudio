import { arraySelector } from "src/Schemas/WorkFlowStep.schema";

export function extractValue(
  obj: any,
  path: string,
  arraySelector?: arraySelector
): any {
  if (!path || !obj) return undefined;

  // Split path e.g. "data.id" → ["data", "id"]
  const keys = path.split('.');

  let current: any = obj;

  for (const key of keys) {
    if (current === undefined || current === null) return undefined;

    // If the current value is an array and we are at "data"
    if (Array.isArray(current[key])) {
      const arr = current[key];

      // Apply array selector logic
      if (arraySelector?.index !== undefined) {
        current = arr[arraySelector.index];
      } 
      else if (arraySelector?.filterField && arraySelector?.filterValue !== undefined) {
        current = arr.find(
          (item: any) =>
            extractValue(item, arraySelector!.filterField!) === arraySelector.filterValue
        );
      } 
      else {
        // Default: take first element
        current = arr[0];
      }
    } 
    else {
      current = current[key];
    }
  }

  return current;
}
