import { useAuth } from "@/contexts/AuthContext";

export type UserRole = 'bidder' | 'auctioneer' | 'admin';

export interface UserPermissions {
  canBid: boolean;
  canCreateAuctions: boolean;
  canManageAuctions: boolean;
  canAccessAdminPanel: boolean;
  canContactSellers: boolean;
  canLeaveReviews: boolean;
}

export function useUserRole() {
  const { user } = useAuth();

  const getUserRole = (): UserRole => {
    if (!user) return 'bidder';
    return (user.role as UserRole) || 'bidder';
  };

  const getPermissions = (role: UserRole): UserPermissions => {
    switch (role) {
      case 'auctioneer':
        return {
          canBid: true,
          canCreateAuctions: true,
          canManageAuctions: true,
          canAccessAdminPanel: false,
          canContactSellers: true,
          canLeaveReviews: true,
        };
      case 'admin':
        return {
          canBid: true,
          canCreateAuctions: true,
          canManageAuctions: true,
          canAccessAdminPanel: true,
          canContactSellers: true,
          canLeaveReviews: true,
        };
      case 'bidder':
      default:
        return {
          canBid: true,
          canCreateAuctions: false,
          canManageAuctions: false,
          canAccessAdminPanel: false,
          canContactSellers: true,
          canLeaveReviews: true,
        };
    }
  };

  const currentRole = getUserRole();
  const permissions = getPermissions(currentRole);

  const isAuctioneer = currentRole === 'auctioneer' || currentRole === 'admin';
  const isBidder = currentRole === 'bidder';
  const isAdmin = currentRole === 'admin';

  return {
    role: currentRole,
    permissions,
    isAuctioneer,
    isBidder,
    isAdmin,
    canBid: permissions.canBid,
    canCreateAuctions: permissions.canCreateAuctions,
    canManageAuctions: permissions.canManageAuctions,
    canAccessAdminPanel: permissions.canAccessAdminPanel,
    canContactSellers: permissions.canContactSellers,
    canLeaveReviews: permissions.canLeaveReviews,
  };
}