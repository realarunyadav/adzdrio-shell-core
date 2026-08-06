import type { ModuleDefinition, ModuleGroup, ModuleGroupId } from "./types";

/**
 * Module registration system.
 * Business applications register themselves here; the shell renders whatever
 * is registered. No module is referenced directly by the shell.
 */
class ModuleRegistry {
  private modules = new Map<string, ModuleDefinition>();
  private groups = new Map<ModuleGroupId, ModuleGroup>();

  registerGroup(group: ModuleGroup): void {
    this.groups.set(group.id, group);
  }

  registerGroups(groups: ModuleGroup[]): void {
    groups.forEach((group) => this.registerGroup(group));
  }

  register(module: ModuleDefinition): void {
    if (this.modules.has(module.id)) {
      throw new Error(`Module "${module.id}" is already registered.`);
    }
    this.modules.set(module.id, module);
  }

  registerAll(modules: ModuleDefinition[]): void {
    modules.forEach((module) => this.register(module));
  }

  unregister(id: string): void {
    this.modules.delete(id);
  }

  get(id: string): ModuleDefinition | undefined {
    return this.modules.get(id);
  }

  list(): ModuleDefinition[] {
    return Array.from(this.modules.values())
      .filter((module) => module.status !== "disabled")
      .sort((a, b) => a.order - b.order);
  }

  listGroups(): ModuleGroup[] {
    return Array.from(this.groups.values()).sort((a, b) => a.order - b.order);
  }

  /** Modules grouped for navigation, filtered by an authorisation predicate. */
  navigationTree(can: (permission?: string) => boolean) {
    return this.listGroups()
      .map((group) => ({
        group,
        modules: this.list().filter(
          (module) => module.group === group.id && can(module.permission),
        ),
      }))
      .filter((entry) => entry.modules.length > 0);
  }
}

export const moduleRegistry = new ModuleRegistry();