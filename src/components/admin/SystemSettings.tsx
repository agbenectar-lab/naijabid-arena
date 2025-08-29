import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Settings, Save, RefreshCw } from "lucide-react";

const SystemSettings: React.FC = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    buyerCommission: "2.5",
    sellerCommission: "5.0",
    minAuctionDuration: "24",
    maxAuctionDuration: "30",
    maintenanceMode: false,
    newUserRegistration: true,
    emailNotifications: true,
    smsNotifications: false,
    platformName: "OyaBid",
    supportEmail: "support@oyabid.com",
    maxBidIncrement: "10000",
    autoModeration: true
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "System settings have been updated successfully.",
    });
  };

  const handleReset = () => {
    setSettings({
      buyerCommission: "2.5",
      sellerCommission: "5.0",
      minAuctionDuration: "24",
      maxAuctionDuration: "30",
      maintenanceMode: false,
      newUserRegistration: true,
      emailNotifications: true,
      smsNotifications: false,
      platformName: "OyaBid",
      supportEmail: "support@oyabid.com",
      maxBidIncrement: "10000",
      autoModeration: true
    });
    
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Commission Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Commission & Fees
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="buyerCommission">Buyer Commission (%)</Label>
              <Input 
                id="buyerCommission"
                type="number" 
                value={settings.buyerCommission}
                onChange={(e) => setSettings({...settings, buyerCommission: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="sellerCommission">Seller Commission (%)</Label>
              <Input 
                id="sellerCommission"
                type="number" 
                value={settings.sellerCommission}
                onChange={(e) => setSettings({...settings, sellerCommission: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Auction Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Auction Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minDuration">Min Auction Duration (hours)</Label>
              <Input 
                id="minDuration"
                type="number" 
                value={settings.minAuctionDuration}
                onChange={(e) => setSettings({...settings, minAuctionDuration: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="maxDuration">Max Auction Duration (days)</Label>
              <Input 
                id="maxDuration"
                type="number" 
                value={settings.maxAuctionDuration}
                onChange={(e) => setSettings({...settings, maxAuctionDuration: e.target.value})}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="maxBidIncrement">Max Bid Increment (₦)</Label>
            <Input 
              id="maxBidIncrement"
              type="number" 
              value={settings.maxBidIncrement}
              onChange={(e) => setSettings({...settings, maxBidIncrement: e.target.value})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Platform Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="platformName">Platform Name</Label>
              <Input 
                id="platformName"
                value={settings.platformName}
                onChange={(e) => setSettings({...settings, platformName: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input 
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Controls */}
      <Card>
        <CardHeader>
          <CardTitle>System Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="maintenance">Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">Temporarily disable user access</p>
            </div>
            <Switch 
              id="maintenance"
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="registration">New User Registration</Label>
              <p className="text-sm text-muted-foreground">Allow new users to register</p>
            </div>
            <Switch 
              id="registration"
              checked={settings.newUserRegistration}
              onCheckedChange={(checked) => setSettings({...settings, newUserRegistration: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoMod">Auto Moderation</Label>
              <p className="text-sm text-muted-foreground">Automatically flag suspicious content</p>
            </div>
            <Switch 
              id="autoMod"
              checked={settings.autoModeration}
              onCheckedChange={(checked) => setSettings({...settings, autoModeration: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="emailNotif">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Send email notifications to users</p>
            </div>
            <Switch 
              id="emailNotif"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="smsNotif">SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">Send SMS alerts for important events</p>
            </div>
            <Switch 
              id="smsNotif"
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => setSettings({...settings, smsNotifications: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save/Reset Actions */}
      <div className="flex gap-4">
        <Button onClick={handleSave} className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
        <Button variant="outline" onClick={handleReset} className="flex-1">
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
};

export default SystemSettings;